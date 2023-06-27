// withRouter used for react-router-dom v6 navigate
// in class component
// See: https://reactnavigation.org/docs/use-navigation/
// See: https://stackoverflow.com/questions/68905266/how-to-use-react-navigation-usenavigation-hook-in-a-class-component
// See: https://stackoverflow.com/questions/74742528/react-withrouter-and-params-accessing-in-class-components-router-v6
//      don't forget to bind the functions that will use navigate in the constructor.  Also, need to call this.props.navigate("route to follow")

// Note:  Also probably makes sense to use redirect instead of navigate in some cases.
// See: https://reactrouter.com/en/main/fetch/redirect

import { useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

export default withRouter