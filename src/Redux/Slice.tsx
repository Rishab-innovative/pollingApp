import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpData {
    fname: string,
    lname: string,
    email: string,
    password:string,
    role: string,
}
interface Signup {
    SignupData:SignUpData [];
}
const initialState: Signup = {
  SignupData: [],
};
const SignUpSlice = createSlice({
  name: "SignUpData",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Signup>) => 
    console.log("hello")
    },
  
});
export const { addData} = SignUpSlice.actions;
export default SignUpSlice.reducer;