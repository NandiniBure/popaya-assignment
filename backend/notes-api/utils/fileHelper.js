const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/notes.json");

const readNotes = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");

    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeNotes = async (notes) => {
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
};

module.exports = {
  readNotes,
  writeNotes,
};
