import Head from 'next/head'
import widgetStyles from '../styles/WidgetStyles.module.css'
import WidgetWrapper from '../components/WidgetWrapper'
import Organization from '../components/Organization.widget'
import BillingInformation from '../components/BillingInformation.widget'
import OrganizationDocuments from '../components/OrganizationDocuments.widget'
import pageStyles from '../styles/Pages.module.css'
import useSWR, {mutate} from 'swr'
import { useUser } from '@auth0/nextjs-auth0'
import { AddNewUsersForm } from '../components/forms/forms'

// TODO: parse

const fetcher = url => fetch(url).then(res => res.json())

const getOrgURL = 'api/protected/get-organization'

export default function Home () {
  const {user} = useUser()
  const {email} = user
  const { data, error} = useSWR(getOrgURL, fetcher)
  if (error) {
    return (<>
      <main className={`main-container ${pageStyles.members}`}>
        <p className='fetch-error'>Error encountered while getting information.
         Try to refresh the page and contact our team in the problem persists.</p>
      </main>
    </>)
  }
  // const handleCreateNewUsers = async () => {
  // const usersArray = [{email: 'test@org.io', type: 'buyer'}]
  //   const res = await fetch(url, {method: "POST", body: JSON.stringify(usersArray)}).then(res => res.json())
  //   console.log(res);
  // }
  return (
    <>
      <Head>
        <title>Riverse projects</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main className={`main-container ${pageStyles.members}`}>
        {/* orgId, rolesList, styles */}
        <div className={widgetStyles['widgets-wrapper']}>
          <WidgetWrapper columns={3} areaName='organization'>
            {data 
            ? <Organization data={data.organization.organization}>
                <AddNewUsersForm revalidate={() => mutate(getOrgURL)} />
              </Organization>
            : <h2>Loading...</h2>
            }
          </WidgetWrapper>
          {/* <WidgetWrapper columns={1} areaName='docs'>
          <OrganizationDocuments />
        </WidgetWrapper> */}
          <WidgetWrapper columns={3} areaName='billing' >
          {data 
            ? <BillingInformation data={data.organization.billingInfo} />
            : <h2>Loading...</h2>
            }
          </WidgetWrapper>
        </div>
      </main>
    </>
  )
}
