import { ScaleLoader } from "react-spinners";

export default function Loader() {
  return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader  color="#4f46e5" height={35} width={4} />
      </div>
  );
}
