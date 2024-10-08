import { nanoid } from "nanoid";

export function generateID() {
  return nanoid();
}

export function deepCopy(target) {
  if (typeof target == "object") {
    const result = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (typeof target[key] == "object") {
        result[key] = deepCopy(target[key]);
      } else {
        result[key] = target[key];
      }
    }

    return result;
  }

  return target;
}

export async function runAnimation($el, animations = []) {
  const play = (animation) =>
    new Promise((resolve) => {
      $el.classList.add(animation.value, "animated", "no-infinite");
      const removeAnimation = () => {
        $el.removeEventListener("animationend", removeAnimation);
        $el.removeEventListener("animationcancel", removeAnimation);
        $el.classList.remove(animation.value, "animated");
        resolve();
      };

      $el.addEventListener("animationend", removeAnimation);
      $el.addEventListener("animationcancel", removeAnimation);
    });

  for (let i = 0, len = animations.length; i < len; i++) {
    await play(animations[i]);
  }
}
