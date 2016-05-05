function pickDeps(moduleNames, allModules) {
    return moduleNames.map(name => {
        if (allModules[name]) {
            return allModules[name];
        } else {
            throw new Error(`${name} cannot be resolved`);
        }
    });
}

function resolveMap(aMap) {
    let resolvers = [];
    for (let key in aMap) {
        let singleResolver = {
            key,
            promise: null,
            value: null,
        };
        singleResolver.promise = aMap[key].then(v => singleResolver.value = v);
        resolvers.push(singleResolver);
    }

    return Promise.all(resolvers.map(resolver => resolver.promise)).then(() => {
        let result = {};
        resolvers.forEach(resolver => result[resolver.key] = resolver.value);
        return result;
    });
}

function resolveDeps(modulesNames, allModules) {
    if (modulesNames.length === 0) {
        return Promise.resolve([]);
    }

    try {
        return Promise.all(pickDeps(modulesNames, allModules));
    } catch (e) {
        return Promise.reject(e.message);
    }
}

function getInjector(modulesRepository = {}) {
    const clonedRepository = {
        ...modulesRepository,
    };

    let injector = function injector(nextModuleGetter) {
        return nextModuleGetter(clonedRepository);
    };

    injector.then = (success, failure) => resolveMap(clonedRepository).then(success, failure);
    injector.catch = (failure) => resolveMap(clonedRepository).catch(failure);

    return injector;
}

/**
 * Returns an Array of strings for a string with comma separated values
 * @param {string|string[]} injects
 * @returns {string[]}
 */
function normalizeInjects(injects) {
    if (typeof injects === 'string') {
        return injects
            .split(',')
            .map(s => s.trim())
            .filter(s => !!s);
    } else if (typeof injects === 'object' && injects instanceof Array) {
        return injects;
    }

    return [];
}

/**
 *
 * @param {string} moduleName
 * @optional
 * @param {string|string[]} moduleInjects
 * @param {function} moduleDefinition
 * @returns {function}
 */
function ddi(moduleName,
             moduleInjects,
             moduleDefinition) {

    /** @type {Array} */
    let moduleInjectsNormalized;

    if (typeof moduleInjects === 'function') {
        moduleDefinition = moduleInjects;
        moduleInjectsNormalized = normalizeInjects(moduleDefinition.$inject);
    } else {
        moduleInjectsNormalized = normalizeInjects(moduleInjects);
    }

    function ddiGetter(modulesRepository = {}) {

        let deps = resolveDeps(
            moduleInjectsNormalized,
            modulesRepository
        );

        ddi.logger && deps.catch(error => ddi.logger.error(error));

        modulesRepository[moduleName] = deps
            .then(resolvedDeps => moduleDefinition.apply(null, resolvedDeps));

        return getInjector(modulesRepository);

    };

    return ddiGetter;

}

ddi.inject = ddi.getInjector = getInjector;

ddi.logger = null;

export default ddi;
