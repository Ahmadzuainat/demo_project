// import GPT4All from "gpt4all";

// // تهيئة الموديل
// const model = new GPT4All("src/models/ggml-model.bin"); // path to your .bin file

// export const summarizeNote = async (req, res) => {
//   try {
//     const { content } = req.body;
//     if (!content) return res.status(400).json({ message: "Content is required" });

//     const summary = await model.generate(`Summarize this note:\n${content}`, {
//       maxTokens: 200,
//     });

//     res.json({ summary });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
