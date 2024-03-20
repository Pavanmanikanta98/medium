// import { FC } from "react";
// import {
//   EditorComposer,
//   Editor,
//   ToolbarPlugin,
//   BoldButton,
//   InsertDropdown,
//   InsertLinkButton,
//   ItalicButton,
//   UnderlineButton,
//   Divider
// } from "verbum";
// import {useEditorContent }from "../hooks/index"; // Import the custom hook

// const NoteViewer: FC = () => {
//   const { content, 
//     setContent, 
//     title,
//     setTitle } = useEditorContent();
  
//    // Destructure content and setContent from the custom hook

//   const sendContentToBackend = () => {
//     // Replace this with your actual backend endpoint URL
//     const backendUrl = "https://example.com/api/saveContent";
    
//     // Replace 'content' with the name of the field expected by your backend
//     const requestBody = { content };

//     fetch(backendUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(requestBody)
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Failed to send content to backend");
//       }
//       // If the request was successful, you may want to perform additional actions here
//       console.log("Content successfully sent to backend");
//     })
//     .catch(error => {
//       console.error("Error sending content to backend:", error);
//     });
//   };

//   return (
//     <div>
//       <EditorComposer onContentChange={setContent}>
//         <Editor hashtagsEnabled={false} autoLinkEnabled emojisEnabled>
//           <ToolbarPlugin defaultFontSize="18px">
//             <BoldButton />
//             <ItalicButton />
//             <UnderlineButton />
//             <InsertLinkButton />
//             <Divider />
//             <InsertDropdown enablePoll={true} />
//             <Divider />
//           </ToolbarPlugin>
//         </Editor>
//       </EditorComposer>
//       <div>
//         <h2>Editor Content:</h2>
//         <p>{content}</p>
//       </div>
//       <button onClick={sendContentToBackend}>Send Content to Backend</button>
//     </div>
//   );
// };

// export default NoteViewer;
