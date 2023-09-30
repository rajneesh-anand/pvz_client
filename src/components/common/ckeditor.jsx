import React, { useEffect, useState, useRef } from "react";

export default function Editor() {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <CKEditor
      editor={ClassicEditor}
      data={messageDescription}
      config={{
        link: {
          decorators: {
            addTargetToExternalLinks: {
              mode: "automatic",
              callback: (url) => /^(https?:)?\/\//.test(url),
              attributes: {
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          },
        },
      }}
      onReady={(editor) => {
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            "172px",
            editor.editing.view.document.getRoot()
          );
        });
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setMessageDescription(data);
      }}
    />
  );
}
