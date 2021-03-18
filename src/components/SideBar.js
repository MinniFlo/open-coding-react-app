import NestedLabelList from "./NestedLabelList";
import '../style/App.css'
import {selectLabels} from "../features/labelsSlice";
import {useSelector} from "react-redux";



export default function SideBar() {

  const labelIds = useSelector(selectLabels).filter(label => label.parentLabelId === "").map(label => label.id);

  return (
    <div id="sideBar"  className="sideBar" >
        <NestedLabelList labelIds={labelIds} indent={1}/>
    </div>
  );
}