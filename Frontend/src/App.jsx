import Main from "./Main";
import { BrowserRouter } from "react-router-dom";
import { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./LoginToggle";

const UserContext = createContext();

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        localStorage.setItem("value", JSON.stringify(state));
    }, [state]);

    let localData = localStorage.getItem("value");

    useEffect(() => {
        let data = JSON.parse(localData);
        if (localData) {
            dispatch({ type: "user", payload: data });
        }
    }, []);
    return (
        <>
            <UserContext.Provider value={{ state, dispatch }}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
};

export default App;
export { UserContext };