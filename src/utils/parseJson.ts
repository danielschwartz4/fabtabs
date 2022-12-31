export const JsonFilter = (tree: any, mask: any, trim?: boolean) => {
  // TODO implement trim
  trim = trim || false;
  if (typeof tree !== "object") throw new Error("invalid JSON");
  if (typeof mask !== "object") throw new Error("invalid JSON filter object");
  if (Array.isArray(mask)) throw new Error("invalid JSON filter object");

  let results: [] = [];

  switch (typeof tree) {
    case "object":
      results = _parseMask(tree, mask, trim, results);
      break;
  }

  return _generateResultObj(results);
};

const _generateResultObj = (results: any) => {
  const obj: any = {};
  obj.length = results.length;

  obj.all = () => {
    return results;
  };

  obj.get = (index: number) => {
    if (index > results.length - 1) return undefined;
    return results[index];
  };

  obj.first = () => {
    return obj.get(0);
  };

  obj.last = () => {
    return obj.get(results.length - 1);
  };

  return obj;
};

const _parseMask = (tree: any, mask: any, trim: boolean, results: any) => {
  const maskKeys = Object.keys(mask);

  if (Array.isArray(tree)) {
    tree.map((item) => _parseMask(item, mask, trim, results));
  } else {
    // get keys of current tree
    let treeKeys = Object.keys(tree);
    // check length if all maskKeys are part of this structure and their values are equal
    let isSubMask =
      maskKeys.filter((val) => {
        return treeKeys.indexOf(val) >= 0;
      }).length === maskKeys.length;
    // if keys match, check their value
    if (isSubMask) {
      let filter = maskKeys.filter((item) => {
        if (typeof tree[item] === "string" && mask[item] instanceof RegExp) {
          return mask[item].test(tree[item]);
        } else if (typeof mask[item] !== "object") {
          return tree[item] === mask[item] || mask[item] === "$any";
        }
        return _compareObj(mask[item], tree[item]);
      });

      if (filter.length === maskKeys.length) {
        if (trim) {
          results.push(_trim(tree, mask));
        } else {
          results.push(tree);
        }
      }
    }

    // check sub tree as well
    treeKeys.forEach((item) => {
      if (typeof tree[item] === "object")
        _parseMask(tree[item], mask, trim, results);
    });
  }

  return results;
};

const _trim = (tree: any, mask: any) => {
  if (typeof tree === "object") {
    const obj: any = {};

    for (const key in mask) {
      const v = tree[key];
      obj[key] = typeof tree === "object" ? _trim(tree[key], mask[key]) : v;
    }

    return obj;
  }
  return tree;
};

// obj1 has to be the mask
// obj2 has to be the full JSON tree
const _compareObj = (obj1: any, obj2: any) => {
  // loop through properties in object 1
  for (let p in obj1) {
    // check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
      return false;
    }

    switch (typeof obj1[p]) {
      case "object":
        if (obj1[p] instanceof RegExp && typeof obj2[p] === "string") {
          return obj1[p].test(obj2[p]);
        }
        if (!_compareObj(obj1[p], obj2[p])) return false;
        break;
      default:
        return obj1[p] === "$any" || obj1[p] === obj2[p];
    }
  }

  return true;
};
