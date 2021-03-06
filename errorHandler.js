function getErrorHandler(log = console.log) {
    return function errorHandler(err, req, res, next) {
        let code, error;

        if(err.errors) {
            const validation = err.errors;
            code = 400;
            error = Object.keys(validation)
                .reduce( (messages, keys) => {
                    messages.push(validation[keys].message);
                    return messages;
                }, [] );
        }
        else if(err.code) {
            code = err.code;
            error = err.error;
        } else {
            code = 500;
            error = 'internal server error';
            log(err);
        }

        res.status(code).send({ error });
    };
}

module.exports = getErrorHandler;