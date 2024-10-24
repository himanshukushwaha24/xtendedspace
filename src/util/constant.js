const STORAGE_KEY = {
	HEADER_TOKEN: "userData",
	JWT_TOKEN: "jwt",
	USER_DETAILS: "user",
	COOKIE_CONSENT: "cookie_consent",
	REDIRECT_LINK: "redirect_link",
};

const RESPONSE_CODES = {
	SUCCESS: "200",
	ERROR: "400",
};

const baseUrl = `/images/slider/`;
const servivePinCode = [    "122001", "122002", "122003", "122004", "122006", "122007", "122008", "122009", "122010", "122011", "122015", "122016", "122017", "122018", "122051", "122052", "122101", "122102", "122103", "122104", "122105", "122107", "122108", "122413", "122414", "122502", "122503", "122504", "122505", "122506", "122508", "123106", "123401",
"201008", "201301", "201303", "201304", "201305", "201306", "201307", "201309", "201310", "203131", "203135", "203141", "203155", "203201", "203202", "203203", "203207", "203209",
"121001", "121002", "121003", "121004", "121005", "121006", "121007", "121008", "121009", "121010", "121011", "121101", "121102", "121103", "121105", "121106", "121107",
"201001", "201002", "201003", "201004", "201005", "201006", "201007", "201009", "201010", "201011", "201012", "201013", "201102", "201201", "201204", "201206", "201302", "245101", "245201", "245205", "245207", "245208", "245301", "245304",
"110001", "110002", "110003", "110005", "110006", "110007", "110008", "110009", "110010", "110011", "110012", "110013", "110014", "110015", "110016", "110017", "110018", "110019", "110020", "110021", "110022", "110023", "110024", "110025", "110026", "110027", "110028", "110029", "110030", "110031", "110032", "110033", "110034", "110035", "110036", "110037", "110038", "110039", "110040", "110041", "110042", "110043", "110044", "110045", "110046", "110047", "110048", "110049", "110051", "110052", "110053", "110054", "110055", "110056", "110057", "110058", "110059", "110060", "110061", "110062", "110063", "110064", "110065", "110066", "110067", "110068", "110069", "110070", "110071", "110072", "110073", "110074", "110075", "110076", "110077", "110078", "110081", "110082", "110083", "110084", "110085", "110086", "110087", "110088", "110089", "110091", "110092", "110093", "110094", "110095", "110096"
];
const redirectionUrl=`https://web.xtendedspace.com/`
import { FaFireExtinguisher, FaSmokingBan , FaVideo, FaLock, FaShieldAlt, FaBug, FaKey } from 'react-icons/fa';
import { FaDropletSlash } from "react-icons/fa6";
import { GiSmokingVolcano } from "react-icons/gi";
const AMENTICS ={
	"FireExtinguisher":{
	  title:"Fire Extinguisher",
	  desc:" Warehouses at Xtended Space are well-equipped fire extinguishers for immediate fire safety.",
	  icon:<FaFireExtinguisher/>,
	},
	"SmokeFree":{
	  title:"Smoke Free",
	  desc:"Installation of smoke detectors provides precautions for your items from fire safety.",
	  icon:<FaSmokingBan />,
	},
	"SecurityCamera":{
	  title:"Security Camera",
	  desc:"We have 24/7 security cameras to monitor and protect your items.",
	  icon:<FaVideo/>,
	},
	"LockedArea":{
		title:"Locked Free",
		desc:"Security is our priority. Each unit has secure locks that keep your items safe.",
	  icon:<FaLock/>,
	},
	"GuardedSociety":{
		title:" Guarded Society",
		desc:"Our facilities have a guard facility that provides extra security.",
		icon: <FaShieldAlt />,
	 },
	 "MoistureFree":{
		title:"Moisture Free",
		desc:"Our storage space keeps your belongings moisture-free.",
		icon:<FaDropletSlash />,
	 },
	 "PestControl":{
		title:"Pest Control",
		desc:"Our pest-controlled warehouses ensure a clean and safe environment for your belongings.",
		icon:<FaBug/>,
	 },
	 "SeparateAccess":{
		title:"Separate Access",
		desc:"Enjoy the convenience and security of access to your storage unit.",
		icon:<FaKey/>,
	 },
	 "SmokeDetector":{
		title:"Smoke Detectors",
		desc:"Installation of smoke detectors provides precautions for your items from fire safety.",
		icon:<GiSmokingVolcano />,
	 },
	//  "LockedArea":{
	// 	title:"",
	// 	desc:"",
	// 	icon:"",
	//  }
 }

export { STORAGE_KEY, RESPONSE_CODES, baseUrl, servivePinCode, redirectionUrl, AMENTICS}

