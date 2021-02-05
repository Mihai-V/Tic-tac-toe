import React from "react";
import { NavMenu } from "../../features/navmenu/navmenu"
import {Button} from "reactstrap";

export function Home() {
  return (
    <div >
        <NavMenu/>
        <Button href="/login" size="lg">Play</Button>
    </div>
  );
}
