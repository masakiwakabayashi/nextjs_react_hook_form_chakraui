import { useForm } from 'react-hook-form'
import {
  // FormErrorMessageを追加
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react'

// フォームで使用する変数の型を定義
type formInputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const RegisterForm = () => {

  // React Hook Formでバリデーションやフォームが送信されたときの処理などを書くために必要な関数
  const {
    handleSubmit,
    register,
    // getValuesを追加
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>()

  // フォームが送信されたときの処理
  const onSubmit = handleSubmit((data) => {
    // フォームで入力されたデータをコンソールに表示
    console.log(data)
  });

  return (
    <Box m={4}>
      <form onSubmit={onSubmit}>
        {/* ユーザー名 */}
        <FormControl isInvalid={Boolean(errors.name)} mb={5}>
          <FormLabel htmlFor='name'>ユーザー名</FormLabel>
          <Input
            id='name'
            // 必須と50文字以内のバリデーション
            {...register('name', {
              required:'必須項目です',
              maxLength: { value: 50, message: '50文字以内で入力してください' },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        {/* メールアドレス */}
        <FormControl isInvalid={Boolean(errors.email)} mb={5}>
          <FormLabel htmlFor='email'>メールアドレス</FormLabel>
          <Input
            id='email'
            // 必須、50文字以内、半角英数字メールアドレス形式のバリデーション
            {...register('email', {
              required:'必須項目です',
              maxLength: { value: 50, message: '50文字以内で入力してください' },
              pattern: { value: /^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+$/, message: 'メールアドレスを入力してください' },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        {/* パスワード */}
        <FormControl isInvalid={Boolean(errors.password)} mb={5}>
          <FormLabel htmlFor='password'>パスワード</FormLabel>
          <Input
            id='password'
            type='password'
            // 必須、8文字以上、50文字以内、半角英数字のバリデーション
            {...register('password', {
              required:'必須項目です',
              minLength: { value: 8, message: '8文字以上で入力してください' },
              maxLength: { value: 50, message: '50文字以内で入力してください' },
              pattern: { value: /^[0-9a-zA-Z]*$/, message: '半角英数字で入力してください' },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        {/* 確認パスワード */}
        <FormControl isInvalid={Boolean(errors.passwordConfirm)} mb={5}>
          <FormLabel htmlFor='passwordConfirm'>確認パスワード</FormLabel>
          <Input
            id='passwordConfirm'
            type='password'
            // 必須、8文字以上、50文字以内、半角英数字、パスワードと一致するかのバリデーション
            {...register('passwordConfirm', {
              required:'必須項目です',
              minLength: { value: 8, message: '8文字以上で入力してください' },
              maxLength: { value: 50, message: '50文字以内で入力してください' },
              pattern: { value: /^[0-9a-zA-Z]*$/, message: '半角英数字で入力してください' },
              validate: (value) => value === getValues("password") || "パスワードが一致しません",
            })}
          />
          <FormErrorMessage>
            {errors.passwordConfirm && errors.passwordConfirm.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme='blue' isLoading={isSubmitting} type='submit'>
          送信
        </Button>
      </form>
    </Box>
  )
}

export default RegisterForm;