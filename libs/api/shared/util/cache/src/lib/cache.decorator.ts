import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

// These cache decorators are just me playing around. They haven't been implemented anywhere in the applications yet
// The really will only work properly if the cache is assumed to be fully `global` which nests `cache-manager` (without redis) is per module.
// If redis is added to the application, then these can be used

function SetupCacheDecorator(
  func: (
    cacheManager: Cache,
    args: any[],
    methodExecution: () => any
  ) => Promise<any>
): (
  target: Function['prototype'],
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor
) => void {
  const injectCacheManager = Inject(CACHE_MANAGER);

  return (
    target: Function['prototype'],
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    injectCacheManager(target, 'cacheManager');

    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = async function (...args: any[]): Promise<any> {
      const cacheManger: Cache = (this as any).cacheManager;

      return func(cacheManger, args, () => originalMethod.apply(this, args));
    };
  };
}

/**
 * Before the method this applied to is called, this decorator will check if there is
 * a value with the `id:key` in cache. If so return that without actually calling the method,
 * otherwise execute the method and store the returned value in the cache at `id:key`.
 *
 * `id` is the first argument in the method
 * @param key - Cache key to get value if exists
 * @param options - Any extra cache options you wish to add
 *
 * NOTE: The first argument in the method must be the id to pre-fix the cache key
 * @example
 *
 * `@GetCacheFromKeyOrSet('meowCount')`
 * getCatMeows(catId: string): Promise<Meow[]>){
 *   return this.catModelService.getMeows(catId);
 * }
 *
 */
export function GetCacheFromKeyOrSet(
  key: string,
  options?: CachingConfig
): ReturnType<typeof SetupCacheDecorator> {
  return SetupCacheDecorator(async (cacheManger, args, methodExecution) => {
    const cacheKey = `${args[0]}:${key}`;

    const value = await cacheManger.get(cacheKey);

    if (value) {
      return value;
    }

    return cacheManger.set(cacheKey, await methodExecution(), options);
  });
}

/**
 * Before the method this applied to is called, this decorator deleted any cache value at `id:key`.
 * Where `id` is the first argument in the method
 *
 * @param key - Cache key to get value if exists
 * @param options - Any extra cache options you wish to add
 */
export function BreakCacheOnKey(
  key: string
): ReturnType<typeof SetupCacheDecorator> {
  return SetupCacheDecorator(async (cacheManger, args, methodExecution) => {
    const cacheKey = `${args[0]}:${key}`;

    console.log('BreakingCacheKey', cacheKey);

    await cacheManger.del(cacheKey);

    return methodExecution();
  });
}
