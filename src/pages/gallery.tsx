import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import ImageGrid from "@/components/image-grid";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { unsplash } from "@/lib/unsplash";
import Loader from "@/components/loader/loader";

function Gallery() {
	const [photos, setPhotos] = useState([]);
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(true)

	const controller = new AbortController();
	const signal = controller.signal;

	const searchPhotos = async (e) => {
		setIsLoading(true)
		e.preventDefault();
		unsplash.search
			.getPhotos({ query, orientation: "landscape" })
			.then((result) => {
				if (result.type === "success") {
					console.log(result);
					setPhotos(result.response.results);
				} else if(result.type === "error") {
					setError(true)
				}
				setIsLoading(false)
			});
	};
	

	const fetchPhotos = async () => {
		unsplash.photos
			.list({ page: 1, perPage: 20 }, { signal })
			.then((result) => {
				if (result.type === "success") {
					setPhotos(result.response.results);
				} else if(result.type === "error") {
					setError(true)
				}
				setIsLoading(false)
			});
	};
	useEffect(() => {
		fetchPhotos()
		// return () => controller.abort();
	}, []);

	return (
		<section className="text-gray-600 bg-white body-font relative">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col w-full mb-20 text-center gap-y-4">
					<h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
						Master Cleanse Reliac Heirloom
					</h1>
					<p className="mx-auto text-base leading-relaxed lg:w-2/3">
						Whatever cardigan tote bag tumblr hexagon brooklyn
						asymmetrical gentrify, subway tile poke farm-to-table.
						Franzen you probably haven't heard of them man bun deep
						jianbing selfies heirloom.
					</p>
					{photos.length>0 &&  (
					<form
						onSubmit={searchPhotos}
						className="flex items-center justify-center flex-1 space-x-16"
					>
						<Input
							placeholder="Filter images..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="w-full h-8 max-w-md lg:max-w-lg"
						/>
						<DataTableFacetedFilter />
					</form>
			)}
				</div>
				{isLoading ? (
						<Loader />
			) : (<ImageGrid data={photos} />)}
			</div>
		</section>
	);
}
					

export default Gallery;
