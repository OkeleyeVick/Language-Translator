import "./App.css";
import { Icon } from "@iconify-icon/react";
import { useEffect, useRef, useState } from "react";
import useHandleSearch from "./useHandleSearch";

function App() {
	// hooks
	const [fromButtonState, setFromButtonState] = useState(); //dropdown button that toggles state when clicked
	const [toButtonState, setToButtonState] = useState(); //dropdown button that toggles state when clicked
	const [fromLangSearch, setFromLangSearch] = useState("");
	const [toLangSearch, setToLangSearch] = useState("");
	const [error, setError] = useState(null); //set error if failed
	const [success, setSuccess] = useState(null); //set success if successful
	const [loading, setLoading] = useState(null); //loading to get result of translation
	const [fromLangDropdown, setFromLangDropdown] = useState(false);
	const [toLangDropdown, setToLangDropdown] = useState(false);
	const fromTextareaRef = useRef(); //ref of the textarea
	const toTextareaRef = useRef(); //ref of the textarea
	const [fromLanguageHiddenInput, setFromLanguageHiddenInput] = useState("en"); //hidden input to
	const [toLanguageHiddenInput, setToLanguageHiddenInput] = useState("fr"); //hidden input from

	// custom hook
	const fromLanguages = useHandleSearch(fromLangSearch); //for the fromDropdown input
	const toLanguages = useHandleSearch(toLangSearch); // for the toDropdown input

	// local functions
	async function translate() {
		try {
			// const encodedParams = new URLSearchParams();
			// encodedParams.append("source_language", `${fromLanguageHiddenInput}`);
			// encodedParams.append("target_language", `${toLanguageHiddenInput}`);
			// encodedParams.append("text", `${fromTextareaRef.current.value}`);

			// const options = {
			// 	method: "POST",
			// 	headers: {
			// 		"content-type": "application/x-www-form-urlencoded",
			// 		"X-RapidAPI-Key": "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a",
			// 		"X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
			// 	},
			// 	body: encodedParams,
			// };

			// fetch("https://text-translator2.p.rapidapi.com/translate", options)
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		const {
			// 			status,
			// 			data: { translatedText },
			// 			message,
			// 		} = data;
			// 		status === "success" ? (toTextareaRef.current.value = translatedText) : null;
			// 		status === "error" ? setError(message) : null;
			// 	});

			const encodedParams = new URLSearchParams();
			encodedParams.append("from", `${fromLanguageHiddenInput}`);
			encodedParams.append("to", `${toLanguageHiddenInput}`);
			encodedParams.append("text", `${fromTextareaRef.current.value}`);
			const API_KEY_ONE = import.meta.env.VITE_RAPIDAPI;

			const options = {
				method: "POST",
				headers: {
					"content-type": "application/x-www-form-urlencoded",
					"X-RapidAPI-Key": `6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a`,
					"X-RapidAPI-Host": "translo.p.rapidapi.com",
				},
				body: encodedParams,
			};

			const response = await fetch("https://translo.p.rapidapi.com/api/v3/translate", options);
			const data = await response.json();
			const { ok, translated_text, error } = data;
			ok === true ? (toTextareaRef.current.value = translated_text) : setError(error);
		} catch (error) {
			setError("Error trying to translate what you entered");
		}
	}

	function runTranslation(e) {
		e.preventDefault();
		translate();
	}

	function handleFromSearch(value) {
		setFromLangSearch(value);
	}
	function handleToSearch(value) {
		setToLangSearch(value);
	}
	function handleFromDropdown() {
		setFromLangDropdown((togglePrevious) => !togglePrevious);
	}
	function handleToDropdown() {
		setToLangDropdown((togglePrevious) => !togglePrevious);
	}
	function setFromLanguage(languageCode, language, index) {
		document.querySelector("#from_lang span").textContent = language;
		handleFromDropdown();
		setFromButtonState(index);
		setFromLanguageHiddenInput(languageCode);
	}
	function setToLanguage(languageCode, language, index) {
		document.querySelector("#to_lang span").textContent = language;
		handleToDropdown();
		setToButtonState(index);
		setToLanguageHiddenInput(languageCode);
	}

	useEffect(() => {}, [toLanguageHiddenInput, fromLanguageHiddenInput]);

	function handleCopyText() {
		const clippy = navigator.clipboard;
		if (clippy && fromTextareaRef.current.value) {
		} else {
			console.log("False");
		}
	}

	// function that swaps the textarea to eachother's position
	function handleSwap(e) {}

	return (
		<div className="App">
			<div className="min-h-screen py-8 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 px-3 md:px-5 overflow-hidden relative">
				<div className="flex flex-col top-2 right-2 z-10 fixed gap-1">
					<div className="transition duration-200 ease-in-out shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] bg-white rounded-md w-48 h-max py-3 px-2 flex items-center gap-2">
						<Icon icon="fa-solid:check-circle" className="text-green-600" />
						<small className="font-semibold text-sm">Text copied</small>
					</div>
					<div className="transition duration-200 ease-in-out shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] bg-white rounded-md w-48 h-max py-3 px-2 flex items-center gap-2 ">
						<Icon icon="material-symbols:cancel-rounded" className="text-red-500 scale-110" />
						<small className="font-semibold text-sm">Error occured</small>
					</div>
				</div>
				<div className="translator-container container col-span-full md:col-start-1 md:col-end-12 lg:col-start-2 lg:col-end-10 bg-white p-4 md:p-8 rounded-md mx-auto md:mt-6 mt-4 h-max">
					<div className="pre-form-container ">
						<form action="" onSubmit={runTranslation}>
							<div className="form-inner flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 flex-wrap">
								<div className="from_lang flex flex-col-reverse md:flex-col flex-grow w-full md:w-auto">
									<textarea
										ref={fromTextareaRef}
										id="text-input"
										rows="8"
										className="resize-none block w-full rounded-tl-md rounded-tr-md transition duration-300 ease-in-out border-b-0 text-sm text-gray-800 bg-white border focus:border-primary focus:shadow-none focus:outline-0 px-3 py-2"
										placeholder="Enter text"
										required></textarea>
									<div className="border py-3 flex items-center justify-around rounded-bl-md rounded-br-md">
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-200">
											<Icon icon="iconoir:sound-high" />
										</button>
										<button
											type="button"
											className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-200"
											onClick={handleCopyText}>
											<Icon icon="fluent:clipboard-24-regular" />
										</button>
										<div className="relative">
											<button id="from_lang" className="flex items-center gap-2" type="button" onClick={handleFromDropdown}>
												<span className="text-sm font-semibold">English</span>
												<Icon icon="ph:caret-down-bold" />
											</button>
											<div
												className={`transition duration-300 transform ease-in-out absolute rounded-md bg-white w-72 p-2 right-full z-[5] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] top-0
													${fromLangDropdown ? "opacity-100 lg:-translate-y-9 pointer-events-auto" : "opacity-0 pointer-events-none"}
												`}>
												<div className="input-container">
													<div className="relative">
														<input
															type="text"
															className="border w-full focus:border-primary focus:outline-none p-2 pl-7 placeholder:text-xs rounded-md text-sm transition duration-[280ms] ease-in-out"
															aria-label="input text"
															onChange={(e) => handleFromSearch(e.target.value)}
															placeholder="Search by language/language code"
														/>
														<input type="hidden" name="from_language" value={fromLanguageHiddenInput} />
														<Icon
															icon="iconoir:search"
															className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
														/>
													</div>
													<div className="mt-2 flex flex-col gap-y-2">
														<div className="bg-primary p-2 rounded-md">
															<span className="text-xs text-white font-semibold">
																Select language to translate from
															</span>
														</div>
														<div className="country-codes-names h-44 overflow-y-auto flex flex-col gap-y-1">
															{fromLanguages &&
																fromLanguages.map((language, index) => {
																	const { code, lang } = language;
																	return (
																		<button
																			type="button"
																			className={` flex items-center justify-start gap-4 py-1 px-2  transition duration-300 ease-in-out rounded-md font-semibold w-full _aof23IF ${
																				fromButtonState === index
																					? "bg-primary text-white bg-opacity-70 hover:text-white hover:bg-opacity-90 hover:bg-primary"
																					: "bg-transparent text-gray-900 hover:bg-gray-200"
																			}`}
																			key={index}
																			onClick={() => setFromLanguage(code, lang, index)}>
																			<span className="text-xs p-1">{code?.toUpperCase()}</span>
																			<span className="text-xs">{lang}</span>
																		</button>
																	);
																})}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<button
									type="button"
									onClick={handleSwap}
									className="shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] flex items-center h-max p-3 rotate-90 md:rotate-0 rounded-full text-2xl text-primary">
									<Icon icon="uil:exchange" />
								</button>

								<div className="to_lang flex flex-col flex-grow w-full md:w-auto">
									<textarea
										ref={toTextareaRef}
										id="text-output"
										rows="8"
										className="resize-none block w-full rounded-tl-md rounded-tr-md transition duration-300 ease-in-out border-b-0 text-sm text-gray-800 bg-white border focus:border-primary focus:shadow-none focus:outline-0 px-3 py-2"
										placeholder="Translation"></textarea>
									<div className="border py-3 flex items-center justify-around rounded-bl-md rounded-br-md">
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-200">
											<Icon icon="iconoir:sound-high" />
										</button>
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-200">
											<Icon icon="fluent:clipboard-24-regular" />
										</button>
										<div className="relative">
											<button id="to_lang" className="flex items-center gap-2" type="button" onClick={handleToDropdown}>
												<span className="text-sm font-semibold">French</span>
												<Icon icon="ph:caret-down-bold" />
											</button>
											<div
												className={`transition duration-300 transform ease-in-out absolute rounded-md bg-white w-72 p-2 right-full z-[5] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] top-0
																${toLangDropdown ? "opacity-100 lg:-translate-y-9 pointer-events-auto" : "opacity-0 pointer-events-none"}
												`}>
												<div className="input-container">
													<div className="relative">
														<input
															type="text"
															className="border w-full focus:border-primary focus:outline-none p-2 pl-7 placeholder:text-xs rounded-md text-sm transition duration-[280ms] ease-in-out"
															aria-label="input text"
															onChange={(e) => handleToSearch(e.target.value)}
															placeholder="Search by language/language code"
														/>
														<input type="hidden" name="to_language" value={toLanguageHiddenInput} />
														<Icon
															icon="iconoir:search"
															className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
														/>
													</div>
													<div className="mt-2 flex flex-col gap-y-2">
														<div className="bg-primary p-2 rounded-md">
															<span className="text-xs text-white font-semibold">Select language to translate to </span>
														</div>
														<div className="country-codes-names h-44 overflow-y-auto">
															{toLanguages &&
																toLanguages.map((language, index) => {
																	const { code, lang } = language;
																	return (
																		<button
																			type="button"
																			className={`flex items-center justify-start gap-4 py-1 px-2 hover:bg-gray-100 transition duration-300 ease-in-out rounded-md font-semibold w-full  ${
																				toButtonState === index
																					? "bg-primary text-white bg-opacity-70 hover:text-white hover:bg-opacity-90 hover:bg-primary"
																					: "bg-transparent text-gray-900 hover:bg-gray-200"
																			}`}
																			key={index}
																			onClick={() => setToLanguage(code, lang, index)}>
																			<span className="text-xs p-1">{code?.toUpperCase()}</span>
																			<span className="text-xs">{lang}</span>
																		</button>
																	);
																})}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="submit-button text-center mt-4">
								<button type="submit" className="py-4 bg-primary w-full rounded-lg text-white font-semibold text-sm">
									Translate Text
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
