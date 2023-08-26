import React, { useEffect } from "react";

export default function ScatterRandomBlobs() {
  const blobs = [
    <svg
      className="scattered-blobs"
      key={1}
      viewBox="0 0 960 540"
      width="960"
      height="540"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <g transform="translate(448.40775404889797 268.3809917714222)">
        <path
          d="M142.8 -188.8C182.9 -167.4 211.7 -122.8 228.7 -73.6C245.7 -24.4 250.8 29.4 235.2 76.1C219.5 122.8 183.2 162.5 140.6 183.4C98 204.2 49 206.1 -2 208.8C-52.9 211.5 -105.8 215 -132.6 189C-159.3 163 -159.9 107.6 -166.1 60.6C-172.3 13.5 -184.1 -25.1 -180.8 -66C-177.4 -106.9 -159 -150.1 -126.3 -174C-93.7 -197.9 -46.8 -202.5 2.3 -205.6C51.3 -208.7 102.7 -210.3 142.8 -188.8"
          fill="#6e046f"
        ></path>
      </g>
    </svg>,
    <svg
      className="scattered-blobs"
      key={2}
      viewBox="0 0 960 540"
      width="960"
      height="540"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <g transform="translate(436.6202359465342 276.6394964472171)">
        <path
          d="M170.8 -169.6C214.3 -127.3 237.6 -63.6 225.5 -12.1C213.4 39.4 165.7 78.7 122.2 120.4C78.7 162.1 39.4 206 -6.1 212.2C-51.6 218.3 -103.2 186.6 -125.7 144.9C-148.2 103.2 -141.6 51.6 -138.9 2.7C-136.2 -46.2 -137.4 -92.4 -114.9 -134.7C-92.4 -177.1 -46.2 -215.5 8.7 -224.3C63.6 -233 127.3 -211.9 170.8 -169.6"
          fill="#a313a8"
        ></path>
      </g>
    </svg>,
    <svg
      className="scattered-blobs"
      key={3}
      viewBox="0 0 960 540"
      width="960"
      height="540"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <g transform="translate(511.3879442782727 254.92981055952333)">
        <path
          d="M95.7 -139.8C122.5 -112.3 141.5 -82.2 151.3 -49.7C161.2 -17.2 161.9 17.8 158.3 58.4C154.7 98.9 146.7 144.9 119.6 181.1C92.5 217.3 46.2 243.6 6.7 234.5C-32.9 225.3 -65.8 180.6 -94.8 145C-123.8 109.5 -148.9 83 -174.8 46.6C-200.7 10.2 -227.3 -36.2 -222.5 -78.9C-217.7 -121.6 -181.4 -160.7 -139.1 -183.1C-96.8 -205.6 -48.4 -211.3 -7 -201.7C34.5 -192.1 69 -167.3 95.7 -139.8"
          fill="#6e046f"
        ></path>
      </g>
    </svg>,
    <svg
      className="scattered-blobs"
      key={4}
      viewBox="0 0 960 540"
      width="960"
      height="540"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <g transform="translate(458.0673389634438 270.50670813281084)">
        <path
          d="M147.8 -192.3C190.6 -172.4 223.7 -127.9 235.2 -79.5C246.6 -31.1 236.5 21.2 210.2 57.9C184 94.5 141.6 115.5 103.9 140.8C66.1 166 33.1 195.5 -5.9 203.6C-44.9 211.8 -89.7 198.5 -124.9 172.4C-160.1 146.4 -185.6 107.5 -193.3 66.8C-201 26.2 -190.8 -16.3 -178.7 -59.4C-166.5 -102.5 -152.3 -146.3 -122.2 -170.4C-92.1 -194.4 -46 -198.7 3.2 -203.2C52.5 -207.6 105 -212.2 147.8 -192.3"
          fill="#a313a8"
        ></path>
      </g>
    </svg>,
    <svg
      className="scattered-blobs"
      key={5}
      viewBox="0 0 960 540"
      width="960"
      height="540"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <g transform="translate(461.16428882812914 249.51476135760234)">
        <path
          d="M142.3 -132.5C180.5 -104.2 204.8 -52.1 196.2 -8.6C187.6 34.9 146.1 69.8 107.9 106.3C69.8 142.8 34.9 180.9 -14.4 195.3C-63.6 209.6 -127.3 200.3 -149.8 163.8C-172.3 127.3 -153.6 63.6 -139.4 14.3C-125.1 -35.1 -115.2 -70.2 -92.7 -98.6C-70.2 -126.9 -35.1 -148.5 8.5 -156.9C52.1 -165.4 104.2 -160.8 142.3 -132.5"
          fill="#a313a8"
        ></path>
      </g>
    </svg>,
  ];
  const winHeight = window.innerHeight;
  const winWidth = window.innerWidth;
  let width, height;
  useEffect(() => {
    let getBlobs = document.getElementsByClassName("scattered-blobs");

    for (let i = 0; i < getBlobs.length; i++) {
      width = getBlobs[i].getBBox().width;
      height = getBlobs[i].getBBox().height;

      let maxWidth = winWidth - width;
      let maxHeight = winHeight - height;

      let blobX = Math.round(Math.random() * maxWidth);
      let blobY = Math.round(Math.random() * 2 * maxHeight);
      getBlobs[i].style.left = blobX + "px";
      getBlobs[i].style.top = blobY + "px";
    }
  }, []);
  return <>{blobs}</>;
}
