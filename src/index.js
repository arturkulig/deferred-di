function pickDependencies(moduleNames, allModules) {
    let depPicked = {};

    moduleNames.forEach(name => {
        if (allModules[name]) {
            depPicked[name] = allModules[name];
        } else {
            throw new Error(`${name} cannot be resolved`);
        }
    });

    return depPicked;
}

function resolveMap(aMap) {
    let resolvers = [];
    for (let key in aMap) {
        let singleResolver = {
            key,
            promise: null,
            value: null,
        };
        singleResolver.promise = aMap[key].then(value => {
            singleResolver.value = value;
        });
        resolvers.push(singleResolver);
    }

    return Promise.all(resolvers.map(resolver => resolver.promise)).then(() => {
        let result = {};
        resolvers.forEach(resolver => result[resolver.key] = resolver.value);
        return result;
    });
}

function resolveDependencies(modulesNames = [], allModules) {
    if (modulesNames.length === 0) {
        return Promise.resolve({});
    }

    try {
        return resolveMap(pickDependencies(modulesNames, allModules));
    } catch (e) {
        return Promise.reject(e.message);
    }
}

function getInjector(modulesRepository = {}) {
    let injector = function injector(nextModuleGetter) {
        return nextModuleGetter(modulesRepository);
    };

    injector.modules = modulesRepository;
    injector.clone = () => getClonedInjector(modulesRepository);

    injector.then = (success, failure) => resolveMap(modulesRepository).then(success, failure);
    injector.catch = (failure) => resolveMap(modulesRepository).catch(failure);

    return injector;
}

function getClonedInjector(modulesRepository) {
    let clonedRepository = {
        ...modulesRepository,
    };
    return getInjector(clonedRepository);
}

/**
 *
 * @param {string} moduleName
 * @param {string} moduleInjects
 * @param {function} moduleDefinition
 * @returns {*}
 */
function ddi(moduleName,
             moduleInjects,
             moduleDefinition) {

    if (typeof moduleInjects === 'function') {
        moduleDefinition = moduleInjects;
        moduleInjects = moduleDefinition.$inject || '';
    }

    function ddiGetter(modulesRepository = {}) {

        let deps = resolveDependencies(
            moduleInjects
                .split(',')
                .filter(s => !!s)
                .map(s => s.trim()),
            modulesRepository
        );

        if (ddi.logger) {
            deps.catch(error => ddi.logger.error(error));
        }

        modulesRepository[moduleName] = deps
            .then(resolvedDeps => moduleDefinition(resolvedDeps));

        let injector = getInjector(modulesRepository);

        return injector;

    };

    return ddiGetter;

}

ddi.injector = ddi.inject = getInjector;

ddi.logger = null;

export default ddi;
