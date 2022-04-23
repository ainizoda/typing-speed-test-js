let folder = {
  "Новая папка": {
    files: {
      videos: {
        $__files: ["Eminem - Lose Yourself.mp4", "video.ogg"],
      },
      musics: {
        "old school": {
          $__files: [
            "2pac - Changes.mp3",
            "Snoop Dogg - Tarararara.mp3",
            "Eminem - Not Afraid.mp3",
            "Lil Pump - Gucci Gang.mp3",
          ],
        },
      },
      photos: {
        $__files: [],
      },
    },
    games: {
      PES2022: {
        $__files: ["config.conf", "README.txt", "start.exe"],
      },
    },
  },
  Projects: {
    react: {
      $__files: [],
    },
    vanilla_js: {
      $__files: [],
    },
  },
};

function logFiles(folder, depth) {
  let space = "    ";
  depth++;
  for (item in folder) {
    let isFolder = folder[item]?.constructor.name === "Object";

    if (isFolder) {
      console.log(`${space.repeat(depth)}[] ${item}`);
      logFiles(folder[item], depth);
    } else if (item === "$__files") {
      if (folder[item].length) {
        for (let i = 0; i < folder[item].length; i++) {
          console.log(space.repeat(depth) + folder[item][i]);
        }
      } else {
        console.log(space.repeat(depth) + "[empty]");
      }
    }
  }
}

logFiles(folder, 0);
