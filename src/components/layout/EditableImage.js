import Image from "next/image";

export default function EditableImage({link, setLink}) {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    debugger
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload= () => {
        const base64Data = reader.result;
        setLink(base64Data);
      };

    }
  };
  

  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  );
}