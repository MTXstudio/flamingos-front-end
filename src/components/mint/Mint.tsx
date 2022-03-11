import MintButton from '../mintButton/MintButton'
import MintProgress from '../mintProgress/MintProgress'
import styles from './Mint.module.scss'
import ClubSign from '../../assets/pfsc_sign.svg'
import { useFlamingo } from '../../providers/PinkFlamingoSocialClubProvider'
import { useEffect, useState } from 'react'
import RedeemButton from '../RedeemButton/RedeemButton'
import title from '../../assets/mint-title.svg'
import multipfsc from '../../assets/pfsc-multi.svg'
import passport from '../../assets/passport.svg'
import multilogo from '../../assets/mulit-logo.svg'

const Mint = () => {


  const { checkIfEligibleForAirdrop, decreaseAmount, increaseAmount, counter } = useFlamingo()
  const [isEligible, setIsEligible] = useState<boolean>(false)
  const [buyAmount, setBuyAmount] = useState<number>(1)
 
  useEffect(() => {
    const data = async () => {
      const isEligible = await checkIfEligibleForAirdrop()
      if (isEligible !== undefined) {
        setIsEligible(isEligible)
      }
    }

    data()
  }, [checkIfEligibleForAirdrop])

  return (

    <div className={styles.grid}>
        <div className={styles.titleWrapper}>
          <img src={title} alt={'passport mint'} className={styles.titleSvg}/>
        </div>
        <div>
          <div className={styles.container}>
            <div className={styles.box}>
              <img src={multipfsc} alt='multixpfsc' width='100%' className={styles.multisign}/>
              <div className={styles.imgwrapper}>
                <img src={passport} alt='passport' className={styles.passport}/>
              </div>
                <MintProgress />
              <div className={styles.amountWrapper}>
                <div>
                  <button onClick={() => decreaseAmount()} className={styles.amountButton}>-</button>
                </div>
                <div className={styles.amount}>
                  {counter}
                </div>
                <div>
                  <button onClick={() => increaseAmount()} className={styles.amountButton}>+</button>
                </div>
              </div>
              <div className={styles.buttonWrapper}>
                <MintButton />
              </div>
              <div className={styles.imgwrapper}>
                <img src={multilogo} alt='multichain logo' className={styles.multilogo}/>
              </div>
            </div>

          </div>
        </div>
    </div>
    
    // <div className={styles.wrapper}>
    //   // grid 2/3 and 1/3 (height: 80vh)
    //   // title left 
    //   // passport window right 
    //   <div>
    //     <a href="https://www.pinkflamingosocial.club/" rel="external" target="blank">
    //       <img src={ClubSign} alt="Pink Flamingo Social Club Logo" className={styles.clubSign} />
    //     </a>
    //   </div>
    //   <div className={styles.description}>
    //     The promised lands are burning, The Great Migration is underway. These new lands offer
    //     hope, prosperity and intoxicating indulgence for the traveling flamingo. On the volcanic
    //     banks of the Great Pink Lake a grandiose club is home to the elusive, the elite, the
    //     sinful and the sinister. Flamingos from many chains will travel far and wide to unlock
    //     the secrets of the infamous Pink Flamingo Social Club.
    //   </div>
    //   <MintProgress />
    //   <div className={styles.buttons}>
    //     <MintButton />
    //     {isEligible && <RedeemButton />}
    //   </div>
    // </div>
  )
}

export default Mint