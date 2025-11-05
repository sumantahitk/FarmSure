import jwt from "jsonwebtoken";

export const isAuthenticated=async (req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:`User not authenticated`,
                success:false
            });
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode)
        {
            return res.status(401).json({
                message:`Invalid token`,
                success:false
            });
        }
        req.id=decode.userId;
        next();
    }catch(err)
    {
        console.error('Authentication error:', err);
    }
}

export const isBuyer = async (req, res, next) => {
  const user = await User.findById(req.id);
  if (user.userType !== "buyer") {
    return res.status(403).json({ message: "Access denied: Only buyers allowed" });
  }
  next();
};

export const isFarmer = async (req, res, next) => {
  const user = await User.findById(req.id);
  if (user.userType !== "farmer") {
    return res.status(403).json({ message: "Access denied: Only farmers allowed" });
  }
  next();
};
