// useParams hook for class component
// See: https://stackoverflow.com/questions/62516430/how-can-i-use-param-in-path-as-prop-react-router-dom-v6
//enables access to url parameters as properties
import { useParams } from 'react-router-dom';
export default function withParams(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />
  }
}