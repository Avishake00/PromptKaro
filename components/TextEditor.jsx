import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import the styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); // Dynamic import to avoid server-side rendering issues

const formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"color",
];

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, false] }],
		["bold", "italic", "underline", "strike"],
		[{ font: [] }],
		[{ size: ["small", false, "large", "huge"] }],
		[{ color: [] }],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["blockquote", "link", "image"],
	],
};

const TextEditor = ({Value,handleOnchange,placeholderText}) => {
  return (
    <ReactQuill
						value={Value}
						onChange={handleOnchange}
						required
						theme="snow"
						placeholder="Write your prompt here..."
						style={{ height: "220px", borderRadius: "8px" }}
						modules={modules}
						formats={formats}
					/>
  )
}

export default TextEditor