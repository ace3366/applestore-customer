import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function ValidateAlert() {
  //Phần Redux
  const nameVal = useSelector((state) => state.validate.name);
  const emailVal = useSelector((state) => state.validate.email);
  const passwordVal = useSelector((state) => state.validate.password);
  const phoneVal = useSelector((state) => state.validate.phone);
  const emailLogInVal = useSelector((state) => state.validate.emailLogIn);
  const passwordLogInVal = useSelector((state) => state.validate.passwordLogIn);
  // Phần searchPram
  const [searchParam, setSearchParam] = useSearchParams();
  const presentMode = searchParam.get("mode");
  return (
    <div className="mb-6 pl-16 italic w-full text-rose-400">
      {presentMode === "login" ? (
        <>
          <p>{emailLogInVal}</p>
          <p>{passwordLogInVal}</p>
        </>
      ) : (
        <>
          <p>{nameVal}</p>
          <p>{emailVal}</p>
          <p>{passwordVal}</p>
          <p>{phoneVal}</p>
        </>
      )}
    </div>
  );
}
