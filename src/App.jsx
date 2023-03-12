import { Icon } from "@iconify-icon/react";
import { createContext, useState } from "react";
import Index from "./Index";
import LanguageDetect from "./LanguageDetect";

export const ErrorSuccesContainerContext = createContext();

function App() {
	const [view, changeView] = useState(false);
	const [container, setContainer] = useState(false);
	const [error, setError] = useState(null); //set error if failed
	const [success, setSuccess] = useState(null); //set success if successful
	const [loading, setLoading] = useState(false); //loading to get result of translation

	return (
		<ErrorSuccesContainerContext.Provider
			value={{ view, changeView, container, setContainer, error, setError, success, setSuccess, loading, setLoading }}>
			<div className="App">
				<div className=" m-4">
					<button
						className="transition duration-300 ease-in-out bg-white rounded-md p-3 text-xs leading-tight font-bold shadow-md hover:bg-primary border hover:shadow-none hover:text-white hover:bg-opacity-50 hover:border hover:border-white"
						onClick={() => changeView((prev) => !prev)}>
						{view ? "Detect language" : "Translate language"}
					</button>
				</div>
				<div className="container-title text-center mt-4">
					<button className="text-white text-2xl md:text-4xl font-semibold">{view ? "Language Translator 🚀" : "Detect Language"}</button>
					<small className="text-white block">
						{view ? "Enjoy translating as much as 183 languages😁💅" : "Detect any language in the world"}
					</small>
				</div>
				<div className="py-8 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 px-3 md:px-5 overflow-hidden relative">
					<div
						className={`flex flex-col top-2 right-2 z-10 fixed gap-1 transition duration-300 ease-in-out w-max${
							container === true ? "opacity-100 pointer-events-auto visible" : "invisible opacity-0 pointer-events-none"
						}`}>
						<div
							className={`transition duration-200 ease-in-out shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] bg-white rounded-md w-max sm:w-64 h-max py-3 px-3 items-center gap-2 md:whitespace-nowrap ${
								success ? "flex" : "hidden"
							}`}>
							<Icon icon="fa-solid:check-circle" className="text-green-600" />
							<small className="font-semibold text-xs">{success}</small>
						</div>
						<div
							className={`transition duration-200 ease-in-out shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] bg-white rounded-md w-max sm:w-64 h-max py-3 px-3 flex items-center gap-2 whitespace-nowrap  ${
								error ? "flex" : "hidden"
							}`}>
							<Icon icon="material-symbols:cancel-rounded" className="text-red-500 scale-110" />
							<small className="font-semibold text-xs">{error}</small>
						</div>
					</div>
					{view ? <Index /> : <LanguageDetect />}
				</div>
			</div>
		</ErrorSuccesContainerContext.Provider>
	);
}

export default App;
