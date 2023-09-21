import { unsplash } from '@/lib/unsplash';
import React, {useEffect, useState} from 'react'
import { Basic } from 'unsplash-js/src/methods/photos/types';

const numberWords = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
];


function ImageGridItem({photoId, index}: {photoId:string, index: number}) {
    const [randomText, setRandomText] = useState('');
    const [photo, setPhoto] = useState<Basic>();

    // const generateRandomText = () => {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     const textLength = 10; // Adjust the length of the random text as needed
    
    //     let result = '';
    //     for (let i = 0; i < textLength; i++) {
    //       const randomIndex = Math.floor(Math.random() * characters.length);
    //       result += characters.charAt(randomIndex);
    //     }
    
    //     return setRandomText(result);
    //   };
    //   useEffect(() => {
    //     generateRandomText()
      
        
    //   }, [])
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchPhoto = async () => {
      unsplash.photos.get({ photoId }, { signal })
        .then((result) => {
          if (result.type === "success") {
            setPhoto(result.response.results);
          }
        });
    };
    useEffect(() => {
      fetchPhoto()
      // return () => controller.abort();
    }, []);
      
  return (
    photo ? 
    <div
					data-grid={{
						i: numberWords[index],
						x: index % 4,
						y: index / 4,
						w: 1,
						h: 1,
					}}
					key={photo.id}
					className="bg-gray-200 cursor-pointer p4 lg:w-1/3 sm:w-1/2"
				>
					<div className="relative flex">
						<img
							alt={photo.alt_description as string}
							className="absolute inset-0 object-cover object-center w-full h-full"
							src={photo.urls.regular}
						/>
						<div className="relative z-10 w-full px-8 py-10 m-4 bg-white border-4 border-gray-200 opacity-0 hover:opacity-100">
							<h2 className="mb-1 text-sm font-medium tracking-widest text-indigo-500 title-font">
								{photo.description?.slice(0, 15)}
							</h2>
							<h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
								Shooting Stars
							</h1>
							<p className="leading-relaxed">
								{photo.alt_description}
							</p>
						</div>
					</div>
					<div className="absolute inset-x-0 bottom-1">
						<ul className="flex flex-wrap mx-4">
							<li className="mr-auto">
								<p className="flex text-gray-400 hover:text-gray-600">
									{/* #{photo} */}
								</p>
							</li>
							<li className="mr-2">
								<a
									href="#"
									className="flex text-gray-400 hover:text-gray-600"
								>
									<svg
										className="mr-0.5"
										style={{
											width: "24px",
											height: "24px",
										}}
										viewBox="0 0 24 24"
									>
										<path
											fill="currentColor"
											d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z"
										/>
									</svg>
									7
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex text-gray-400 hover:text-gray-600"
								>
									<svg
										className="mr-0.5"
										style={{
											width: "24px",
											height: "24px",
										}}
										viewBox="0 0 24 24"
									>
										<path
											fill="currentColor"
											d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
										/>
									</svg>
									3
								</a>
							</li>
						</ul>
					</div>
				</div>:
        <p>Error</p>
    )
}

export default ImageGridItem