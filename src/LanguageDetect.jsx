import { Icon } from "@iconify-icon/react";
import { useReducer, useRef, useState } from "react";
import DetectLanguage from "detectlanguage";

const API_KEY_TWO = import.meta.env.VITE_LANG_DETECT_KEY;
const languageDetector = new DetectLanguage(`${API_KEY_TWO}`);

const text = "ọlọrun iyanu";

const LanguageDetect = ({ allProps }) => {
	const { container, setContainer, error, setError, success, setSuccess, loading, setLoading } = allProps;

	const textAreaRef = useRef();

	function callCurrenState() {
		// set container to true then hide it after 5 seconds
		setContainer(true);
		setTimeout(() => {
			setContainer(false);
		}, 5000);
	}

	function handleCutText() {
		const clippy = navigator.clipboard;
		if (!textAreaRef.current.value) {
			setContainer(true);
			callCurrenState();
			setError("Cannot copy empty space");
		} else if (clippy && textAreaRef.current.value) {
			clippy.writeText(textAreaRef.current.value);
			textAreaRef.current.value = "";
		} else {
			setContainer(true);
			callCurrenState();
			setError("Error copying text");
		}
	}

	function runDetection(e) {
		e.preventDefault();
		setLoading(true);
	}
	return (
		<div className="translator-container container col-span-full md:col-start-2 md:col-end-12 lg:col-end-12 bg-white p-4 md:p-8 rounded-md mx-auto mt-4 h-max">
			<form action="" onSubmit={runDetection}>
				<div>
					<textarea
						id="text-input"
						rows="8"
						ref={textAreaRef}
						spellCheck="false"
						className="resize-none block w-full rounded-md transition duration-300 ease-in-out text-sm text-gray-800 bg-white border focus:border-primary focus:shadow-none focus:outline-0 px-3 py-2"
						placeholder="Enter language text"></textarea>
				</div>
				<div className="grid grid-cols-4 py-3">
					<div className="flex flex-col items-center">
						<button
							type="button"
							className="p-2 rounded-full transition duration-300 ease-in-out bg-transparent hover:bg-gray-100 w-max mx-auto">
							<Icon className="flex" icon="ph:speaker-high-light" />
						</button>
						<span className="leading-none text-xs font-semibold">Read</span>
					</div>
					<div className="flex flex-col items-center">
						<button
							type="button"
							className="p-2 rounded-full transition duration-300 ease-in-out bg-transparent hover:bg-gray-100 w-max mx-auto"
							onClick={handleCutText}>
							<Icon className="flex" icon="clarity:scissors-line" />
						</button>
						<span className="leading-none text-xs font-semibold">Cut</span>
					</div>
					<div className="flex flex-col items-center">
						<button
							type="button"
							className="p-2 rounded-full transition duration-300 ease-in-out bg-transparent hover:bg-gray-100 w-max mx-auto">
							<Icon className="flex" icon="fluent:clipboard-paste-24-regular" />
						</button>
						<span className="leading-none text-xs font-semibold">Read</span>
					</div>
					<div className="flex flex-col items-center">
						<button
							type="button"
							className="p-2 rounded-full transition duration-300 ease-in-out bg-transparent hover:bg-gray-100 w-max mx-auto">
							<Icon className="flex" icon="fluent:clipboard-24-regular" />
						</button>
						<span className="leading-none text-xs font-semibold">Read</span>
					</div>
				</div>
				<div className="submit-button text-center">
					<button
						disabled={loading === true ? true : false}
						type="submit"
						className={`transition ease-in-out duration-300 py-3 justify-center bg-primary w-full rounded-lg flex items-center gap-4 min-h-[3rem] ${
							loading ? "cursor-not-allowed" : "cursor-pointer"
						} hover:bg-opacity-95`}>
						<span className=" text-white font-semibold text-sm">Detect Language</span>
						<div
							className={`h-6 w-6 border-2 border-l-transparent rounded-full animate-spin ${
								loading === false ? "hidden" : "inline"
							}`}></div>
					</button>
				</div>
			</form>
		</div>
	);
};

export default LanguageDetect;
