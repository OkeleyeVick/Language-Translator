import ISO6391 from "iso-639-1";
import "./App.css";
import { Icon } from "@iconify-icon/react";
import { useEffect, useRef, useState } from "react";
import useFilter, { codesArray } from "./useFilter";

function App() {
	// hooks
	const [fromLanguages, setFromLanguages] = useState(codesArray);
	const [toLanguages, setToLanguages] = useState(codesArray);
	const [fromLangSearch, setFromLangSearch] = useState("");
	const { array } = useFilter(fromLangSearch);

	// dropdowns
	const [isFromLangDropdownOpen, setFromLangDropdown] = useState(false);
	const [isToLangDropdownOpen, setToLangDropdown] = useState(false);

	// text inputs
	const fromTextAreaRef = useRef(null);
	const toTextAreaRef = useRef(null);

	// hidden inputs
	const fromLanguageHiddenInput = useRef(null);
	const toLanguageHiddenInput = useRef(null);

	// for dropdowns
	const fromLangRefDropdown = useRef(null);
	const toLangRefDropdown = useRef(null);

	// <== local functions ==>

	// functions that toggles the state of the dropdowns
	function handleFromLangDropdown() {
		setFromLangDropdown((currentState) => !currentState);
	}
	function handleToLangDropdown() {
		setToLangDropdown((currentState) => !currentState);
	}

	function updateFromLanguage(language, code) {
		const fromLanguageContainer = document.querySelector("#from_lang span");
		fromLanguageContainer.innerHTML = language;
		fromLanguageHiddenInput.current.value = code;
	}
	function updateToLanguage(language, code) {
		const toLanguageContainer = document.querySelector("#to_lang span");
		toLanguageContainer.innerHTML = language;
		toLanguageHiddenInput.current.value = code;
	}

	//function that triggers the translate when clicked
	function runTranslation(e) {
		e.preventDefault();
		console.log(fromLanguageHiddenInput.current.value);
		console.log(toLanguageHiddenInput.current.value);
	}

	useEffect(() => {
		// const fromLangCode = fromLanguageHiddenInput.current.value;
		// const toLangCode = toLanguageHiddenInput.current.value;

		const encodedParams = new URLSearchParams();
		encodedParams.append("from", "en");
		encodedParams.append("to", "ru");
		encodedParams.append("text", `Hoello`);

		const options = {
			method: "POST",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"X-RapidAPI-Key": "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a",
				"X-RapidAPI-Host": "translo.p.rapidapi.com",
			},
			body: encodedParams,
		};

		// fetch("https://translo.p.rapidapi.com/api/v3/translate", options)
		// 	.then((response) => response.json())
		// 	.then((response) => console.log(response))
		// 	.catch((err) => console.error(err));
	});

	// function that swaps the textarea to eachother's position
	function handleSwap(e) {}

	return (
		<div className="App">
			<div className="min-h-screen py-8 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 items-center px-3 md:px-5 overflow-hidden">
				<div className="translator-container container col-span-full md:col-start-1 md:col-end-12 lg:col-start-2 lg:col-end-10 bg-white p-4 md:p-8 rounded-md mx-auto md:-mt-16">
					<div className="pre-form-container ">
						<form action="" onSubmit={runTranslation}>
							<div className="form-inner flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 flex-wrap">
								<div className="from_lang flex flex-col flex-grow w-full md:w-auto">
									<textarea
										id="text-input"
										rows="8"
										ref={fromTextAreaRef}
										className="resize-none block w-full rounded-tl-md rounded-tr-md transition duration-300 ease-in-out border-b-0 text-sm text-gray-800 bg-white border focus:border-primary focus:shadow-none focus:outline-0 px-3 py-2"
										placeholder="Enter text"
										required></textarea>
									<div className="border py-3 flex items-center justify-around rounded-bl-md rounded-br-md">
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-300">
											<Icon icon="iconoir:sound-high" />
										</button>
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-300">
											<Icon icon="fluent:clipboard-24-regular" />
										</button>
										<div className="relative">
											<button id="from_lang" className="flex items-center gap-2" type="button" onClick={handleFromLangDropdown}>
												<span className="text-sm font-semibold">English</span>
												<Icon icon="ph:caret-down-bold" />
											</button>
											<div
												ref={fromLangRefDropdown}
												className={`transition duration-300 transform ease-in-out translate-y-8 absolute rounded-md bg-white w-72 p-2 right-full z-[5] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] -translate-x-4 top-0 ${
													isFromLangDropdownOpen
														? "opacity-100 -translate-y-9 pointer-events-auto"
														: "opacity-0 pointer-events-none"
												}`}>
												<div className="input-container">
													<div className="relative">
														<input
															type="text"
															className="border w-full focus:border-primary focus:outline-none p-2 pl-7 placeholder:text-xs rounded-md text-sm transition duration-[280ms] ease-in-out"
															aria-label="input text"
															onChange={(e) => setFromLangSearch(e.target.value)}
															placeholder="Search by language/language code"
														/>
														<input type="hidden" name="from_language" value="" ref={fromLanguageHiddenInput} />
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
														<div className="country-codes-names h-44 overflow-y-auto">
															{fromLanguages &&
																fromLanguages.map((lang, index) => {
																	const { code, language } = lang;
																	return (
																		<button
																			type="button"
																			className="flex items-center justify-start gap-4 py-1 px-2 hover:bg-gray-100 transition duration-300 ease-in-out rounded-md font-semibold w-full _aof23IF"
																			key={index}
																			onClick={() => updateFromLanguage(language, code)}>
																			<span className="text-xs p-1">{code?.toUpperCase()}</span>
																			<span className="text-xs">{language}</span>
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
										id="text-output"
										rows="8"
										ref={toTextAreaRef}
										className="resize-none block w-full rounded-tl-md rounded-tr-md transition duration-300 ease-in-out border-b-0 text-sm text-gray-800 bg-white border focus:border-primary focus:shadow-none focus:outline-0 px-3 py-2"
										placeholder="Translation"></textarea>
									<div className="border py-3 flex items-center justify-around rounded-bl-md rounded-br-md">
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-300">
											<Icon icon="iconoir:sound-high" />
										</button>
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-300">
											<Icon icon="fluent:clipboard-24-regular" />
										</button>
										<div className="relative">
											<button id="to_lang" className="flex items-center gap-2" type="button" onClick={handleToLangDropdown}>
												<span className="text-sm font-semibold">English</span>
												<Icon icon="ph:caret-down-bold" />
											</button>
											<div
												ref={toLangRefDropdown}
												className={`transition duration-300 transform ease-in-out translate-y-8 absolute rounded-md bg-white w-72 p-2 right-full z-[5] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] -translate-x-4 top-0 ${
													isToLangDropdownOpen
														? "opacity-100 -translate-y-9 pointer-events-auto"
														: "opacity-0 pointer-events-none"
												}`}>
												<div className="input-container">
													<div className="relative">
														<input
															type="text"
															className="border w-full focus:border-primary focus:outline-none p-2 pl-7 placeholder:text-xs rounded-md text-sm transition duration-[280ms] ease-in-out"
															aria-label="input text"
															onChange={(e) => console.log(e)}
															placeholder="Search by language/language code"
														/>
														<input type="hidden" name="to_language" value="" ref={toLanguageHiddenInput} />
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
																toLanguages.map((lang, index) => {
																	const { code, language } = lang;
																	return (
																		<button
																			type="button"
																			className="flex items-center justify-start gap-4 py-1 px-2 hover:bg-gray-100 transition duration-300 ease-in-out rounded-md font-semibold w-full"
																			key={index}
																			onClick={() => updateToLanguage(language, code)}>
																			<span className="text-xs p-1">{code?.toUpperCase()}</span>
																			<span className="text-xs">{language}</span>
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
