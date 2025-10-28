import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, lable, defaultValue = "" }) {
  return (
    <div className="w-full">
      {lable && <label className="inline-block mb-2 pl-1 text-gray-300 font-medium">{lable}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="dthc95z0nh1jku3ambi1evgaqszu8of4spy814aqzdrmdx4x"
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              skin: "oxide-dark",
              content_css: "dark",
              toolbar:
                "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | code fullscreen",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "emoticons",
                "codesample",
                "pagebreak",
                "textcolor",
                "colorpicker",
              ],
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
