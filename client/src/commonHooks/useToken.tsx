
const useToken = () => {
    const token = localStorage.getItem('token');
    return (
    token ? token : null
  )
}

export default useToken;
