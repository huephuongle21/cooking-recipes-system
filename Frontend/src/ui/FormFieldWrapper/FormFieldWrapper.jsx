import styles from './formfieldwrapper.module.scss'

const FormFieldWrapper = WrappedComponent => {
    const App = props => {
        return (
            <label className={styles.root}>
                <span className="position-relative d-block">
                    <WrappedComponent {...props} placeholder={props.placeholder || ' '} />
                    <span className={`position-absolute ${styles.label}`}>{props.title}</span>
                </span>
            </label>
        )
    }
    return App;
}

export default FormFieldWrapper;