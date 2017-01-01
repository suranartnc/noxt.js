export default function(components, params) {
  const needs = components.reduce((prev, current) => {
    return (current.prefetchData || [])
      .concat((current.WrappedComponent && (current.WrappedComponent.prefetchData !== current.prefetchData) ? current.WrappedComponent.prefetchData : []) || [])
      .concat(prev);
  }, []);
  // return Promise.all(needs.map(need => dispatch(need(params))));
  return Promise.all(needs.map(need => {
    return need(params)
      .then(res => console.log('prefetched data: ', res))
  }))
}
