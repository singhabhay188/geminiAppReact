import Mainbar from "./Components/Mainbar/Mainbar";
import Sidebar from "./Components/Sidebar/Sidebar";

export default function App() {
  return (
    <div className="flex h-full w-full">
      <Sidebar/>
      <Mainbar/>
    </div>
  )
}