import{test,expect} from '@playwright/test'

const randomEmail = `rodrigo.${Date.now()}@qubika.com`
const data = {email:(randomEmail), password: '12345678'}
const registerServiceEndpoint = '/api/auth/register'

test.describe('Exercise 2', () => {
    test('New user creation via API', async ({request}) => {

    const newUser = await request.post(`${registerServiceEndpoint}`,{ data })

    expect(newUser.status()).toEqual(201)
 })
    test('Instructions', async function({page}){

    await page.goto('https://club-administration.qa.qubika.com/#/auth/login')

    await expect(page).toHaveURL(/login/)
     
    await expect(page).toHaveTitle('Qubika Club')

    await page.getByPlaceholder('Usuario o correo electrónico').fill(data.email)

    await page.getByPlaceholder('Contraseña').fill(data.password)

    await page.getByRole('button',{ name:'Autenticar'}).click()

    await expect(page).toHaveURL(/dashboard/)

    await page.locator('[href="#/category-type"]').click()

    await page.locator('[class="btn btn-primary"]').click()

    await page.getByPlaceholder('Nombre de categoría').fill(`Rodri Categoria`)

    await page.getByRole('button', { name: 'Aceptar' }).click()

    await page.locator('div').filter({ hasText: 'Tipo de categoría adicionada' }).nth(2).isVisible()

    await page.waitForResponse(response => response.status()===200)

    await page.locator('[class="btn btn-primary"]').click()

    await page.getByPlaceholder('Nombre de categoría').fill(`Rodri SubCategoria`)

    await page.getByText('Es subcategoria?').click()

    await page.getByRole('combobox').getByRole('textbox').fill('Rodri Categoria')

    await page.getByRole('option', { name: 'Rodri Categoria' }).first().click()

    await page.getByRole('button', { name: 'Aceptar' }).click()

    while (!(await page.getByRole('cell', { name: 'Rodri Categoria' }).nth(1).isVisible())){
        await page.locator('a').filter({ hasText: 'Next' }).click({delay:250});
    }
})
})
