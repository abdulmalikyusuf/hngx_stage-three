import React from "react";
import useProgressiveImg from "../hooks/useProgressiveImg";


export function BlurredUpImage({
	lowQualitySrc,
	highQualitySrc,
	className,
}: {
	lowQualitySrc: string;
	highQualitySrc: string;
	className?: string;
}) {
	const [src, { blur }] = useProgressiveImg(lowQualitySrc, highQualitySrc);
	return (
		<img
			className={className}
			src={src}
			style={{
				width: 200,
				filter: blur ? "blur(20px)" : "none",
				transition: blur ? "none" : "filter 0.3s ease-out",
			}}
		/>
	);
};
