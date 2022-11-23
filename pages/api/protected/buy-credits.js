const CreditTransaction = async (req, res) => {
  const data = req.body
  const success = !!data.creditsPurchased
  setTimeout(() => {
    res.json({ success , data })
  }, 1000);
}

export default CreditTransaction