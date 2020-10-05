const httpLink = function (value) {
  const link = value.toLowerCase();
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link;
  } if (link.startsWith('//')) {
    return `http:${link}`;
  }
  return `http://${link}`;
};

export default httpLink;
