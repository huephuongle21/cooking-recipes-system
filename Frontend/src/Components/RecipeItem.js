import Heart from '../icons/Heart';
import styles from '../scss/recipeitem.module.scss';

const RecipeItem = ({ title, date, description, image, onSubscribe }) => {
    return (
        <div className={`${styles.root} card`}>
            <div className='d-flex gap-3'>
                <img alt='' src={image} className={styles.image} />
                <div className={`d-flex flex-column justify-content-between flex-1 ${styles.titleWrapper}`}>
                    <h4 className='m-0'>{title}</h4>
                    <p className='m-0'>{date}</p>
                </div>
                {onSubscribe && <button onClick={onSubscribe} className={`${styles.subscribe_btn} p-0 d-flex mb-auto`}><Heart className='m-auto' /></button>}
            </div>
            <div className={`${styles.description} mt-4`}>
                <h4 className='mt-0 mb-2'>Description:</h4>
                <p className='m-0'>{description}</p>
            </div>
        </div>
    )
}

export default RecipeItem;