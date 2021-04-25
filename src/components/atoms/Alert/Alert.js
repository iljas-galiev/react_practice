const Alert = (props) => {
    const {children, type} = props;
    const alertType = "alert alert-" + type;

    if (Array.isArray(children)) {
        return (
            <div className={alertType}>
                {children.map((text, i ) => (
                    <li key={i}> {text} </li>
                ))}
            </div>
        );
    }

    return <div className={alertType}>{children}</div>;
};

export default Alert;
