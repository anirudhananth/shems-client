import { cookies } from 'next/headers';

const callApi = async () => {
    try {
        const cookie = cookies();
        const appSessionCookie = cookie.get("appSession");

        
        
        if (!appSessionCookie) {
            console.error("appSession cookie is not set");
            
            return;
        }
        const res = await fetch(`http://localhost:8080/api/v1/device/1/get`, {
            headers: {
                Cookie: {
                    'JSESSIONID': 'CC948A0952FB34EEE2B8A7EB9A0EC24A',
                    'appSession': 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwidWF0IjoxNzAyNDI2MTE1LCJpYXQiOjE3MDI0MjMzMjcsImV4cCI6MTcwMjUxMjUxNX0..ueGdxftMTLJ1kGFa.AoG0_BvpjDlOOABcIUQHr3KQffad3YhQXSlRtwagQsBeAobUZXnP-CSgiJIRQpE1ZzLSkg9fXAu1tWsvvhZm1NW5KtMzez1pmRJNjrfGUDD0X3iev6QkZZsVM9Tm25-LYrwto7F8HS-4kJh50_PedNaJc9Fp_uuAWV87ABSmJDE6INnWe_Kc0qjjcYOHysc-wa2vvLoPC3GVKeA60hJrrW4tLFSwOYt2--_DGqLiPsN440svFBZT3sLGsJYfGKkpksXkPa1YUTd_uFTX4FSPV0aNARbRE8tabVWpzn4vAqFoFC3AAUMn95gL89k5iqeD5QFO2kE05VVAfhulrYA__XtfXy05SIMuEzlCIUU7sFd-V7kfBEheJRlCIIaQHU2SAau24BzLk_mnIS8DSizVE_6xULHiYSAn8f4Rze39gJFuXUShkWDhvsVBiPB4ksbuPfQLUNaVQkIUnEHazHbSJk9k6xGXrefciG2JDL3sC8ym0X_VPoCb_xYLVhLBuAY2_fqqqMLdJDSGqRnK88SO_vCOswz2TkxdCrhsNqxaw-cdo69Iq2VLlQxCTAexZN15V3jXp4Jbdf40gc4GotmbDgrBBtS-BrZk7tC4nX03Ov8XFFZIOttQqdXl0cxHbfo68WkhjsZVvgzHGeJqvWNUe-uyR99bO-L8zB5gunsyZzyWA9Uwkdy_JHPletX4dCGQ4zouKJBYoucbUh6LRbGbXzGm_2eIJzkzll4wLupzr0scPkHb5BrmsTs_yPXvvCwKmq01iz4EdTuWlPHu7hEjuEgFZSIIvvQtGFfjgOpWWvDRv7RBCyD1bP0On4EB6QVgpj8jp50ek21Z0JLhFZ0cD9FWPz5iUc-i5e1OuC1Y50zwWNnF5Cf9aeAO1yBRNuetxwT2BxufibuZrBLD55jvV61eQOj_HVqN2SwR_NXXbH8ZtJKiVWpiSydxdFWdgHusD01jinlTaWrP080jIZTUnOBxJMOndIof2MOadMi1T7Ch_mLtMIL5-hgalmKoxtQDUoqLKHxFos97hFra5PGiytaKoreatK-1A8sFLwjHSdUtFnN6sQizCt3rndwIySQg2JdX1grcHugBAGmjLq1vb9vDHyYHZqghJUvMFJ0lJUBeo6kBrcqWHa_8T-Zqm1xzqGCn-ypjSbcXUbC_w5crczBn9xqrEVYq0UA2Ny_fu6H6IXxihok0NlK62S0A8nw3fHWMlCYnn_3jpe65og-8mnA03r0MXfukqwxGLmmN4Qanw7NIVh70sQLS1-8RsuAY-8hlDN30_zpm8u3kAV3GSy0dBgdodoK8-NjsD6v4mMJTCy0v_dt1NS38x-G0GM4El84OfVdVi29OuV00AmRgn-M0j5WZx19j-67U8zfsRTMxdtiCXt-d-v849k2abTRUCGmZD3yKH4iCMY8PQbIgdqefpQrnySP9QqlyjHGDWf5QpKjDFK0KrmOtkJKaE9hEdLHcSX9rufg01FJ1RAwfMusUiUW3H-WuMuHWg-M_7vDKH7D0iczdT9vds5r57yXOS0MuaVLpPrZIqVj38qxhqBkbdygUsUdbYwxfdsbnVBocAejGXdozhSTMSyOvaFfTSEgNKdBeBWm_VLjlGXQu-Bdil8NGUTr6KCcAlxc9vc43lf44CuQwh0MWKBxjBQK8hww0yRTXenQsfswsRj-xo5rfQSugRuEQgNA49Tf7k_ej-ZZszYmTpwHowP-hMJmJNonviZhPdlCTxnJk5jNvfiDh8pRljYsXj0C06TkgnwW3_ndWDH3iIB8w704hoKL5QV-WW8Jb3jxIHh4Z_P22VUTnI78a1mt8StCwbiFpjD3SrheNurL1ZRgKSd5Cx8Gh3MU2xYlpYHTVeuFOVWsfOWsBlQAxLy2sPXLHPuLIkJUsqWnhLzfvNlAKTVuEziBNuB3N76MZIkhdDvb1GOtnQaZiKWtiGfaScrHslx3eKKF9PW7-9ADASG13gtMKyBwhu9XJlqsMPu4ePA3inaFbUk_4ba1kzJr3m1phlKefIcq-AHLL2zfUsX4jXFLzNKFp6VHmRJfQ_Ciz-I1PDTRZMnxwdkBX09Qg67J5Ls8JwfOr_W9ABrUUVstjND_pWhrte_AKZ-BI2aR6X2kpV5wQpIZlyBJqanYNI5eCj42BKFaN_LaaXEN8dmjCvLowRuhEwyO0GudsLUj_QX4wFeSFin8XEz4XtQJNX_Ho7ECXRjek-wdhDVlNYRWWsx8xno1-dqZbn8LKSp46UYmgnWpWzfXIr0k-oJz13-BvEiMEGSWD7rXHT3FvGcbe9TVLnEUTKYDGiEHcoSCwoFwwojHU9YtonJra8xkeTJd9jdVCdpArNKAd08ZHI8i5ZVeDMGIElT15HVngeYfVvsnnbp3kaMqjG3eaTTVVMMIyy9GIfkIpV8V22GTe1HcO-Jn0ITlG5zvUJoGvlzv-83OTR8TvM2m2ZR-UwM5Du-EtMNp9gnxvVf-RuwCUD-nyDpUGQMAZFWnlx4Tfu8kgRT3d92TtIQgPrfpqGKzatBF18sDGnVTnqlTxD56LWsEdhOmOWSwA6_13J8vluHbcCoavvcM7tCR-g9fx_Mfq_36lh1-DiR2EO8yFapO5Kd3btLNZGlfQsaSJ1pm2XJeaP7TiEbtdfCq4iWP9R0XfoztZRnfNhGLdKSDb3SluJfFYPoc5eqnzjBqJbI0xBklWYTcLPwhQORAihO8lif_WC5oKaPOoZiAUlDECfnSRX-CdezEIl5EeQ7kOSYUsHUKrL3vsJcNurNJ5giMdCvaFaCyyHZ7xPaLT41wvp0Gbxofjf--4n5Gb9eaZzMnjPmsNVrs6HNma0B-VAiHBTeqt2KcKRhFeZIHH.jnT3VmjLNNHd8EXOdWrN-Q..aA2BpPnyX4snelI6.mSA1tDzGncFjkY568DDa-maGwW170m7F4cdiDzph8OCnlYR8mkN6THyTJJwSJKUkYsh7X3TqklzqKwTBksONKMSDPGs_OL23Mlfy3cnOPSpPky8i_zJO2Ff0XlUZeNnldVUZ8-Z4MQbUyGoMSrw0uCVR0OTjMWIkoKlKEmdNfygBWE3864oBtLWrzP8NB_KDRYhDZ9AoBjY3VTKpoeBYIrygw4BtgNlxxOscD1Ce7IwrIx_51fY-hislk0sM8Batnu7fxxb9qkbpY8Cy4BFnt-xbfO_HERFk9XFm8gut6dzNoL4hgPiu1FBFVU-1mySFQPewgwrTfPj9MokauBEPQQr4J8_hvl-OQAH9YPo2tegFyIR0J7ZaljZjSW6Rot4OhfIV8A4JdTQCP7k2KDKfZIh5IooTR500D5kvn9yAtYxlNzwJK8xdUg5wfoz9pYX3pJOaXFERMnnAL6lJbKwmxvVmPUtaozQDBM2s9K6avrRMKVAg2T1uqwtM67QIJ1i0pU0up_X8dw1IywQ6Vr-ExW9iAbmWep89uIR6q4YcYM6WsjK17vkT4SOfZbz8TG5gSV-WBMMjhYcYP6bf6c_HuAjHpQc5g0cGABGXgck0Rg7w_AFniv3hOfLLaPq7Qvoj8GerYBxrSrhMOt3Bitk5gmxFxDZhtgrjlbaM1jeeeSotxOwNbD4-EF7w9sCOTCq8UPpXZeRSortRmH_pHiJosJ1gXy7lu9RgCZpT3ME-SkYuxocQG2IF00M42OK_owhOZgFwh4iKR5jK9xL3rfaJNWoRhP8OEoieBcIpXMgVitf3vhOP6kZXLVTT3faVS-mnh2R5sMlnwkul6n-lOgfGXgTeso-CihSXwj1gdM4WG9HK8LSSOfl6AnAVOw56GqIbYzcWVYYQSRLyaFlYsBrTYpFq5GioC4pQBL_KsY-v8DVo7aYZrtpAW3R-I1e6uondyQN-jT_BvHy_yYgI0gNfBmXObgfpzx720Xx3GVsShlwVpHBsN9K6sRsnusN61QrFRFno6Fit7MC91kQQ9p_Zyv_l9mijX_EglwKY7QHFcMFR91ePloLCLuLKledg_Pa_1ntk65MLhRQsg2TxGp-sDe4x0Iq3AhwItEzXVzG3bFA6ht5BFsjNLHKM5b9lewzyXVBqSySFbsLMD6jf8RHGxtSYypQdP2y9OvG7c1jqI5syOEYdeZNey8PFzI92_SUA5y0b5pgTTr2653Bjbe4OhKtRZPG3y4idgUmw_EaHe8qOnBklROZFEE5nD0mVEchFwpNVO4o2AnPIpPbOWILHEqiSOA6m0J1tRhw5ds5odl5EYhSLZdRJQeRzp2tSyP9nwv5ciIimrQfrzqy5E6o9lJ4wH7DVm1eRk3M6zgKfhtWbbHkQRJ0PSw98yX_6On2bdoYb1AjLjTNRquYzbUVhYRTsFOzSNe0xC0lVvrtrlcfD2uD7lS0lRLlhP5FqBEvh42veqwN1y0UsV9_4-2FTems6jpWDWAgr8wsspCIpuVC-jV8E3FVlOASxk0tUhcQMPJola7GCJw57jZEbOE_JTEc1YDQKm23wz1KP6Vuyy7006Wr1NJrqbCfFtsm9QbeSOWu3jmyKTZA6R-JMsXHsFqt6JaWMC8DsS2iFFFlLIHh64iumQeUP8eWC4GVd4c3IiKrdjiJzL6BTlNbiW7tE16Sx-JoD9vIpewQH5VSX6jQB7Ur_6mMkvrA6JY7HUITvrxHXl_dqeUJozPnOQRLmlg-9gv70pY6ueoV9ocQfjc_KnD6OA7AtNWSIZnh02d4y-QyeJP-UiyfBb0Y4HIN9r15lZWrHFmSmDEaCdG6eYD6MRI1Bf_6f1-VPqWtlvZsHJQLk_64PfQof4uJtk54R950hlCXxvY9OICp9YyAokiyJF1FCHm5akVsecao9jUctAyAMi4NRjX4S_fekow8rZz7WkJUeyk6OryEm2fSXWT-ULbnTUKqyEW-j-9rCddMOHP5PEMjZ_04NpDCYAvae5HLRhac2YDaFsKpUEsgWz8vVUNmAsnmDzmpuCo5-FdPHw_9rWU0axlztn17WlL479jaNkQKSOMeTvlGSbWR3TMcIuyYmskrAfeyWCOsdVToVBxP3Iq91UdhKxH_c4NEQAXmVHDGnCB6u6trCXeWZ33Nr0rHF55IFRgIeXOBd2p5pSIdJrT27vjy2HJUqEqzi1H-cgMaJoHWW1H8z_LlEPSns4j-5m0S3to9drmW_QsYKDpZidBXLnDj6NdGwhaGuYh-FxFXe6nM-YfTDezY6A1u4e5KcHpnClo-rPzhhtEtJoeJ-84U4QkQf54dAL2Y4SL0fUvZYt8-iAamS_qsoJF6qCjAPBzcdmnbrW67hF4S8T9n1eyLStqBghs3n_xWQiaCfFXdsq9tQQUq16_EhlNOkN5jvc6Kj5SeaWPrXuy5o70KjNWiRrTNA8586ZOv4B2MJaVLRF6YiJd3F7fJ0Gr-wn3WEJam55-n1BheC-GFuF3KmMxJY9_mpJxH4K4IjsX9NMnklUem1ORjDl72KDb76pgHrIKU5po5_VvrJzDbrug9kubQqhsWQ3FGDGWuXJcOoFj5cjBoYU4uGkujk5sYBpIQaV7DfmWX3dodn0tkgmJIdV6IgHd3MNBdwDcI-qyfk3-_-2QoijcjQWVX8AHiaqq-Q80iGyNZphn-4nYLH2Em5XvFyb9jPEZC4LBJCF2O9RK6lZSMXx6NCR7GT0Mgom_aUkVjeNmwzX9SB606nG4XaFX6J0NmLjpB4L_UDUnwxYHrPpgcZYXLI9I29nRcSQnWGHZ3pfzYcJMJ7TY3llLBNx61Wl9JErA9ffExJ99Dwx4OR1N2wbezdqcU2Ej9oZA7dtQ3DG-IDrMSbl5DuuZE0QVrRhsLmg8PL-ba9.Uc1lCQVh3BlFmCQYa9XzTQ',
                },
            },
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json(); 
        
        return data; 
    } catch (err) {
        console.error(err);
        
    }
};

export default callApi;