//@ts-nocheck

import * as React from "react";

import { useThumbOverlap } from "react-range";
import { getTrackBackground, Range } from "react-range";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;
const COLORS = ["#660c04", "#e84c3d", "#660c04", "#ccc"];
const THUMB_SIZE = 25;

function ThumbLabel({ rangeRef, values, index }: { rangeRef: Range | null; values: number[]; index: number }) {
  const [labelValue, labelStyle] = useThumbOverlap(rangeRef, values, index, 1, " - ", (value) => `${value} Capacity`);
  return (
    <div
      data-label={index}
      style={{
        display: "block",
        position: "absolute",
        top: "28px",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "11px",
        fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
        padding: "4px",
        borderRadius: "4px",
        backgroundColor: "#e84c3d",
        whiteSpace: "nowrap",
        ...(labelStyle as React.CSSProperties),
      }}
    >
      {labelValue}
    </div>
  );
}

const DualRange: React.FC<{ rtl: boolean }> = ({ rangeValue, setRangeValue, rtl }) => {
  const rangeRef: any = React.useRef<Range>();
  const Thumb = ({ props, index, isDragged }: any) => (
    <div
      {...props}
      style={{
        ...props.style,
        height: `${THUMB_SIZE}px`,
        width: `${THUMB_SIZE}px`,
        borderRadius: "4px",
        backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 2px 6px #AAA",
      }}
    >
      <ThumbLabel rangeRef={rangeRef.current} values={rangeValue} index={index} />
      <div
        style={{
          height: "16px",
          width: "5px",
          backgroundColor: isDragged ? "#e84c3d" : "#CCC",
        }}
      />
    </div>
  );
  const Track = ({ props, children }: any) => (
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      style={{
        ...props.style,
        height: "36px",
        display: "flex",
        width: "100%",
      }}
    >
      <div
        ref={props.ref}
        style={{
          height: "5px",
          width: "100%",
          borderRadius: "4px",
          background: getTrackBackground({
            values: rangeValue,
            colors: COLORS,
            min: MIN,
            max: MAX,
            rtl,
          }),
          alignSelf: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
  return <Range ref={rangeRef} values={rangeValue} onChange={(values) => setRangeValue(values)} renderThumb={Thumb} renderTrack={Track} step={STEP} min={MIN} max={MAX} rtl={rtl} />;
};

export default DualRange;
