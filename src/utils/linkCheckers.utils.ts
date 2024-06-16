import { toast } from "sonner";

const checkDescription = (description: string, maxLength: number) => {
  if (description.length > maxLength) {
    toast.warning("Description to long", {
      description: `Your description should be less than ${maxLength} characters.`,
      duration: 5000,
    });
    return false;
  }
  return true;
};

const checkValidTags = (tags: string, tagsArray: string[]): boolean => {
  const cleanedTags = tags.split(",").map((tag) => {
    return tag.trim();
  });
  if (cleanedTags.length > 3) {
    tagsArray.splice(0, tagsArray.length);
    toast.warning("To many tags", {
      description: "Tags should be 3 or less.",
      duration: 5000,
    });
    return false;
  }
  tagsArray.splice(0, tagsArray.length, ...cleanedTags.sort());
  return true;
};

const checkLinksLimit = (userLinks: any[] | undefined, maxLength: number): boolean => {
  if (userLinks) {
    if (userLinks.length >= maxLength) {
      toast.error("Can not create link", {
        duration: 5000,
        description:
          "You reached your links limit, delete one or more to keep using HooLink",
      });
      return false;
    } else {
      return true;
    }
  } else return true;
};

const checkEmptyURL = (URL: string): boolean => {
  if (URL === '') {
    toast.warning("Empty or invalid URL.", {
      duration: 5000,
    });
    return false;
  } else {
    return true;
  }
}

export { checkDescription, checkValidTags, checkLinksLimit, checkEmptyURL };
