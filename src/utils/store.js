import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import nodeSlice from "./nodeSlice";

const store = configureStore({
    reducer: {
        app: appSlice,
        node: nodeSlice,
    }
});

export default store;