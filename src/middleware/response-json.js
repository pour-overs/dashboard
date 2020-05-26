
export default () => (req, res, next) => {
  res.json = (data) => {
    const jsonData = JSON.stringify(data);
    res.setHeader('Content-Type', 'application/json');
    res.end(jsonData);
  };

  next();
}