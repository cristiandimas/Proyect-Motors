const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.createUsers = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //1.crear instancia de la clase user
  const user = new Users({ name, email, password, role });

  //2. encriptar la contrasena
  //generar los saltos de la encriptacion
  const salt = await bcrypt.genSalt(10);
  //encriptar la contraseña que llega desde user.password, por la req.body
  user.password = await bcrypt.hash(password, salt);
  //3. Guardar en la base de datos con la contrasena encriptada
  await user.save();

  /* Generación de un token JWT para el usuario. */
  const token = await generateJWT(user.id);
  /* Envío de respuesta al cliente. */
  res.status(200).json({
    status: 'success',
    message: 'User has been created successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1.verificar si el usuario existe  y si el password es correcto
 /* Buscando un usuario en la base de datos con el correo y estado disponible. */
  const user = await Users.findOne({
    where: {
      email,
      status: 'available',
    },
  });

  /* Comprobando si el usuario existe en la base de datos. */
  if (!user) {
    return next(new AppError('The user could not ber found', 404));
  }
  /* Comparando la contraseña que envía el usuario con la contraseña que está almacenada en la base de datos. */
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  //2. si todo es correcto, enviar token al cliente.
  /* Generación de un token JWT para el usuario. */
  const token = await generateJWT(user.id);

  /* Envío de respuesta al cliente. */
  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
