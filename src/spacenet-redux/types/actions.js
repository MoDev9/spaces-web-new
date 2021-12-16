export const BATCH = 'BATCHING_REDUCER.BATCH';

export function batchActions(actions, type = BATCH) {
  return {type, meta: {batch: true}, payload: actions};
}