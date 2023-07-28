"use client";
import React from "react";
import { SeekPlayer } from "./timeline-related/SeekPlayer";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { TimeFrameView } from "./timeline-related/TimeFrameView";

export const TimeLine = observer(() => {
  const store = React.useContext(StoreContext);
  const percentOfCurrentTime = (store.currentTimeInMs / store.maxTime) * 100;
  
  const handleOnWheel = (event : any)=>{
    event.deltaY < 0 ? store.setMaxTime(store.maxTime + 1000 < store.maxTime ? store.maxTime : store.maxTime + 1000) : 
    store.setMaxTime(store.maxTime - 1000 < 0 ? 0:store.maxTime - 1000)
  }

  return (
    <>
      <SeekPlayer />
      <div className="relative height-auto overflow-auto" onWheel={handleOnWheel}>
        <div
          className="w-[2px] bg-red-400 absolute top-0 bottom-0 z-20"
          style={{
            left: `${percentOfCurrentTime}%`,
          }}
        ></div>
        {store.editorElements.map((element) => {
          return <TimeFrameView key={element.id} element={element} />;
        })}
      </div>
    </>
  );
});
