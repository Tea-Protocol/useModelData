import { useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

/**
 * 获取 Model 中属性，提升性能的方法
 * @param propName model 中的属性名
 * @param modelName model 名，可不传
 */
export function useModelData(propName: string | string[], modelName = 'objectManager_listView') {
  const selector = useCallback(
    ({ [modelName]: model }) => {
      if (Array.isArray(propName)) {
        return propName.reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: model && model[cur],
          }),
          {}
        );
      }

      return model && model[propName];
    },
    [propName, modelName]
  );

  return useSelector(selector, shallowEqual);
}
